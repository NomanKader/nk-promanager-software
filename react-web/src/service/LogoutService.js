const _LogoutService = () => {    
    sessionStorage.clear();
    window.location.replace("/");
};

export default _LogoutService;
