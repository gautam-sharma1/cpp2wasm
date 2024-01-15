const defaultLanguageConstants = {
  CPP: {
    defaultCode: 
    "//////////////////////////////////////\n\
// DO NOT MODIFY\n\
//////////////////////////////////////\n\
#include <stdio.h>\n\
#include <emscripten/emscripten.h>\n\
\n\
#ifdef __cplusplus\n\
#define EXTERN extern \"C\"\n\
#else\n\
#define EXTERN\n\
#endif\n\
///////////////////////////////////////\n\
\n\
EXTERN EMSCRIPTEN_KEEPALIVE void myFunction(int argc, char ** argv) {\n\
    printf(\"MyFunction Called\\n\");\n\
}",
    defaultLanguage: "cpp",
  },
  JS: {
    defaultCode: "// js code",
    defaultLanguage: "javascript",
  },
};

export default defaultLanguageConstants;
