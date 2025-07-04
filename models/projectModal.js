const { poolConnect, pool, sql } = require("../config/db");

exports.getAllProjects = async () => {
  await poolConnect;
  const result = await pool.request().query("SELECT * FROM Projects");
  return result.recordset;
};

exports.getProjectById = async (id) => {
  await poolConnect;
  const result = await pool
    .request()
    .input("id", sql.Int, id)
    .query("SELECT * FROM Projects WHERE ProjectId = @id");
  return result.recordset[0];
};

exports.createProject = async (data) => {
  await poolConnect;
  const { ProjectName, ProjectDescription, ProjectStartDate, ProjectDueDate, BusinessName } = data;

  const result = await pool
    .request()
    .input("ProjectName", sql.VarChar(150), ProjectName)
    .input("ProjectDescription", sql.Text, ProjectDescription)
    .input("ProjectStartDate", sql.Date, ProjectStartDate)
    .input("ProjectDueDate", sql.Date, ProjectDueDate)
    .input("BusinessName", sql.VarChar(100), BusinessName)
    .query(`
      INSERT INTO Projects (
        ProjectName, ProjectDescription, ProjectStartDate, ProjectDueDate, BusinessName
      )
      VALUES (
        @ProjectName, @ProjectDescription, @ProjectStartDate, @ProjectDueDate, @BusinessName
      );
      SELECT SCOPE_IDENTITY() AS ProjectId;
    `);

  return result.recordset[0];
};

exports.updateProject = async (id, data) => {
  await poolConnect;
  const { ProjectName, ProjectDescription, ProjectStartDate, ProjectDueDate, BusinessName } = data;

  await pool
    .request()
    .input("ProjectId", sql.Int, id)
    .input("ProjectName", sql.VarChar(150), ProjectName)
    .input("ProjectDescription", sql.Text, ProjectDescription)
    .input("ProjectStartDate", sql.Date, ProjectStartDate)
    .input("ProjectDueDate", sql.Date, ProjectDueDate)
    .input("BusinessName", sql.VarChar(100), BusinessName)
    .query(`
      UPDATE Projects SET
        ProjectName = @ProjectName,
        ProjectDescription = @ProjectDescription,
        ProjectStartDate = @ProjectStartDate,
        ProjectDueDate = @ProjectDueDate,
        BusinessName = @BusinessName,
        UpdateDate = GETDATE()
      WHERE ProjectId = @ProjectId
    `);
};

exports.deleteProject = async (id) => {
  await poolConnect;
  await pool
    .request()
    .input("ProjectId", sql.Int, id)
    .query("DELETE FROM Projects WHERE ProjectId = @ProjectId");
};
