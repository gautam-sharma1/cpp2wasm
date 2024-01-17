// import { useEffect } from "react";
// import { useRouter } from "next/router";
// import TagManager from "react-gtm-module";

// const GTM_ID = "YOUR_GTM_ID"; // Replace with your GTM ID

// const GTMInitializer = () => {
//   const router = useRouter();

//   useEffect(() => {
//     TagManager.initialize({ gtmId: GTM_ID });

//     router.events.on("routeChangeComplete", () => {
//       TagManager.refresh();
//     });

//     return () => {
//       router.events.off("routeChangeComplete", () => {
//         TagManager.refresh();
//       });
//     };
//   }, [router.events]);
// 1
//   return <></>;
// };

// export default GTMInitializer;
