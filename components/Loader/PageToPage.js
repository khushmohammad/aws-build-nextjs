import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Loading } from "./Loading";

const PageToPage = () => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleStart = (url) => url !== router.asPath && setLoading(true);
    const handleComplete = (url) => url === router.asPath && setLoading(false);

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  });
  const disableLoaderPath = ["/auth/login"];
  useEffect(() => {
    const isMatched =
      disableLoaderPath && disableLoaderPath.find((e) => router.pathname == e);
    if (isMatched) {
      setLoading(false);
    }
    setTimeout(() => {
      setLoading(false);
    }, 5000);
  }, [router || ""]);

  return loading && <Loading />;
};

export default PageToPage;
