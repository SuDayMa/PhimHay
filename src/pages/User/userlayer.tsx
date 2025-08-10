import HeaderUser from "./HeaderUser"
import { Outlet } from "react-router-dom"
export default function userlayer () {
    return(
        <div className="py-[168px] max-[1121px]:py-[40px]">
            <div className="mx-[128px] px-[20px] flex justify-between max-[1121px]:flex-col max-[1121px]:gap-10 max-[1600px]:mx-0">
                <div className="w-[24%] max-[1121px]:w-full max-[1121px]:text-center">
                    <HeaderUser/>
                </div>
                <div className="w-[65%] max-[1121px]:w-full">
                    <Outlet/>
                </div>
            </div>
        </div>
    )
}