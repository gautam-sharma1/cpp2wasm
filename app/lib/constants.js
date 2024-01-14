const defaultLanguageConstants = {
  CPP: {
    defaultCode: `
    //////////////////////////////////////
    //      DO NOT MODIFY
    //////////////////////////////////////
    #include <stdio.h>
    #include <emscripten/emscripten.h>
        
    #ifdef __cplusplus
    #define EXTERN extern "C"
    #else
    #define EXTERN
    #endif
    ///////////////////////////////////////
    
    EXTERN EMSCRIPTEN_KEEPALIVE void yourFunction(int argc, char ** argv) {
        printf("MyFunction Called\\n");
    }`,
    defaultLanguage: "cpp",
  },
  JS: {
    defaultCode: "// js code",
    defaultLanguage: "javascript",
  },
};

export default defaultLanguageConstants;
