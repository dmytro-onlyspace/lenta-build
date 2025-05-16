const G_TAG = "G-SGFC31VKKL";

const WebGL1 = "WebGL 1.0";
const WebGL2 = "WebGL 2.0";

const Events_Prefix = "RP_";
const Unity_WebGL_Hello_world = Events_Prefix + "Unity_WebGL-Hello_world";
const Hello_World = Events_Prefix + "Hello_World";
//const Splash_Screen_Loading_Started = Events_Prefix + "Splash-Screen-Loading-Started";
const Unity_WebGL_Load_Error = Events_Prefix + "Unity_WebGL_Load_Error";
const Unity_WebGL_Build_Loaded = Events_Prefix + "Unity_WebGL_Build_Loaded";

const ProgressEnum = Object.freeze({
    Error_Initialization: Events_Prefix + "Error_Initialization",
    Create_Unity_Instance: Events_Prefix + "Create_Unity_Instance",
});

buildStatus = "";
