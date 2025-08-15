import { useState } from "react"
import { useParams } from "react-router-dom"

export default function Profile () {
    const {id} = useParams<{id: string}>()
    const user = JSON.parse(localStorage.getItem('user') || '{}')
    const userlist = JSON.parse(localStorage.getItem('userlist') || '[]')
    const U = userlist.filter((u: any) => u.id === parseInt(id || '0'))
    const [valuename, setValuename] = useState(U[0].name || "")
    const [valueimage, setValueimage] = useState(U[0].picture || "")
    const handlevaluename = (e : any) => {
        setValuename(e.target.value)
    }
    const handleupdate = () => {
        const upname = {
            ...user,
            name: valuename,
            picture: valueimage
        };
        localStorage.setItem('user', JSON.stringify(upname));

        const upnamelist = userlist.map((user: any) => {
            if (user.id === parseInt(id || '0')) {
                return {
                    ...user,
                    name: valuename,
                    picture: valueimage
                };
            }
            return user;
        });
        localStorage.setItem('userlist', JSON.stringify(upnamelist));
    };

    const handleimage = (e: any) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setValueimage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };
    
    

    return(
        <div>
            <div className="text-[#ffff] max-[1121px]:mx-[20%] max-[738px]:mx-0">
                <div className="flex flex-col mb-[32px] gap-5">
                    <div className="text-[20px] font-semibold">Tài khoản</div>
                    <p>Cập nhật thông tin tài khoản</p>
                </div>
                <div>
                    <div className="flex justify-between w-[50%] max-[1121px]:w-full max-[738px]:flex-col-reverse max-[738px]:gap-3 ">
                        <div className="w-[70%] max-[1121px]:w-[300px] max-[738px]:w-[100%]">
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
                        <div className="w-[20%] max-[1121px]:w-[100px]">
                            <div>
                                <img src={user.picture} alt="avatar" className=" rounded-full mb-[20px] border-4 border-[#ffff]"/>
                                <input type="file" accept="image/" onChange={handleimage} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}