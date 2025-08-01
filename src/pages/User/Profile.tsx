import { useState } from "react"

export default function Profile () {
    const user = JSON.parse(localStorage.getItem('user') || '{}')
    const [valuename, setValuename] = useState(user.name || "")
    const handlevaluename = (e : any) => {
        setValuename(e.target.value)
    }
    const handleupdate = () => {
        if(valuename){
            const upname = {
                ...user,
                name:valuename
            }
            localStorage.setItem('user',JSON.stringify(upname))
        }
    }
    return(
        <div>
            <div className="text-white">
                <div className="flex flex-col mb-[32px] gap-5">
                    <div className="text-[20px] font-semibold">Tài khoản</div>
                    <p>Cập nhật thông tin tài khoản</p>
                </div>
                <div>
                    <div className="flex justify-between w-[50%]">
                        <div className="w-[70%]">
                            <form>
                                <div className="mb-[24px] flex flex-col">
                                <label className="mb-[8px]">Email</label>
                                <input type="text" value={user.email} className="py-[8px] px-[16px] border-1 bg-[#3636365e] border-gray-700 rounded-lg"></input>
                                </div>
                                <div className="mb-[16px] flex flex-col">
                                <label className="mb-[8px]">Tên hiển thị</label>
                                <input type="text" value={valuename} onChange={handlevaluename}  className="py-[8px] px-[16px] border-1 border-gray-700 rounded-lg"/>
                                </div>
                                <div className="flex">
                                    <button onClick={() => handleupdate()} className="py-[8px] px-[24px] bg-amber-200 text-black rounded-md font-semibold">Cập nhật</button>
                                </div>
                            </form>
                        </div>
                        <div className="w-[20%]">
                            <div>
                                <img src={user.picture} alt="avatar" className=" rounded-full "/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}