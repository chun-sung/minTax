import PageTop from "./components/PageTop";
import Seo from "./components/Seo";

export default function NotFound () {

    return <>
    <Seo title="NotFound | MinTAX" />
    <PageTop />  
    <h1 className="text-center mt-10 text-2xl text-red-500 font-extrabold">페이지를 찾을 수 없습니다.</h1>
    <div className="h-screen"></div>
    </>
}