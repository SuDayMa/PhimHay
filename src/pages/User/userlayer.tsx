import HeaderUser from "./HeaderUser"
import { Outlet } from "react-router-dom"
export default function userlayer () {
    return(
        <div className="py-[168px]">
            <div className="mx-[128px] px-[20px] flex justify-between">
                <div className="w-[18%]">
                    <HeaderUser/>
                </div>
                <div className="w-[79%]">
                    <Outlet/>
                </div>
            </div>
        </div>
    )
}