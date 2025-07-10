const { poolConnect, pool, sql } = require("../config/db");

// Check if project exists
exports.checkProjectExists = async (projectId) => {
  await poolConnect;
  const result = await pool
    .request()
    .input("ProjectId", sql.Int, projectId)
    .query("SELECT 1 FROM Projects WHERE ProjectId = @ProjectId");
  return result.recordset.length > 0;
};

// Check if user exists
exports.checkUserExists = async (userId) => {
  await poolConnect;
  const result = await pool
    .request()
    .input("UserId", sql.Int, userId)
    .query("SELECT 1 FROM Users WHERE UserId = @UserId");
  return result.recordset.length > 0;
};

// Create task and assigned users
exports.createTask = async (taskData, assignedUserIds) => {
  await poolConnect;

  const {
    TaskName,
    ProjectId,
    TaskUserID,
    TaskStartDate,
    TaskDueDate,
    TaskStatus,
    BusinessName,
    CreatedBy,
  } = taskData;
  for (const userId of assignedUserIds) {
    await pool
      .request()
      .input("TaskUserID", sql.VarChar(100), TaskUserID)
      .input("UserId", sql.Int, userId).query(`
        INSERT INTO TaskUser (TaskUserID, UserId, CreateDate)
        VALUES (@TaskUserID, @UserId, GETDATE());
      `);
  }
  const taskResult = await pool
    .request()
    .input("TaskName", sql.VarChar(150), TaskName)
    .input("ProjectId", sql.Int, ProjectId)
    .input("TaskUserID", sql.VarChar(100), TaskUserID)
    .input("TaskStartDate", sql.Date, TaskStartDate)
    .input("TaskDueDate", sql.Date, TaskDueDate)
    .input("TaskStatus", sql.VarChar(50), TaskStatus)
    .input("BusinessName", sql.VarChar(100), BusinessName)
    .input("CreatedBy", sql.Int, CreatedBy).query(`
      INSERT INTO Tasks (
        TaskName, ProjectId, TaskUserID, TaskStartDate, TaskDueDate,
        TaskStatus, BusinessName, CreatedBy, CreateDate
      )
      VALUES (
        @TaskName, @ProjectId, @TaskUserID, @TaskStartDate, @TaskDueDate,
        @TaskStatus, @BusinessName, @CreatedBy, GETDATE()
      );
      SELECT SCOPE_IDENTITY() AS TaskId;
    `);

  const TaskId = taskResult.recordset[0].TaskId;

  return { TaskId };
};

// Get all tasks
exports.getAllTasks = async () => {
  await poolConnect;
  const result = await pool.request().query("SELECT * FROM Tasks");
  return result.recordset;
};

// Update task
exports.updateTask = async (taskId, data) => {
  await poolConnect;
  const request = pool.request().input("TaskId", sql.Int, taskId);
  let updates = [];

  for (const key in data) {
    if (key !== "TaskId") {
      request.input(key, data[key]);
      updates.push(`${key} = @${key}`);
    }
  }

  if (updates.length === 0) return;

  await request.query(`
    UPDATE Tasks SET
      ${updates.join(", ")},
      UpdateDate = GETDATE()
    WHERE TaskId = @TaskId
  `);
};

// Delete task and TaskUser
exports.deleteTask = async (taskId) => {
  await poolConnect;

  // Step 1: Delete TaskUser using TaskUserID from Tasks
  await pool.request().input("TaskId", sql.Int, taskId).query(`
    DELETE FROM TaskUser WHERE TaskUserID = (
      SELECT TaskUserID FROM Tasks WHERE TaskId = @TaskId
    )
  `);

  // Step 2: Delete task
  await pool
    .request()
    .input("TaskId", sql.Int, taskId)
    .query("DELETE FROM Tasks WHERE TaskId = @TaskId");
};

exports.getAssignedUsersByProject = async (projectId) => {
  try {
    await poolConnect;
    const result = await pool
      .request()
      .input("ProjectId", sql.Int, projectId)
      .query(`
        SELECT 
            tu.TaskUserID,
            u.UserId,
            u.UserName,
            u.Email,
            t.ProjectId,
            t.TaskName
        FROM 
            Tasks t
        INNER JOIN 
            TaskUser tu ON t.TaskUserID = tu.TaskUserID
        INNER JOIN 
            Users u ON tu.UserId = u.UserId
        WHERE 
            t.ProjectId = @ProjectId
      `);
    return result.recordset;
  } catch (error) {
    console.error("Error fetching assigned users by project:", error);
    throw new Error("DB error in getAssignedUsersByProject");
  }
};


