import Icon from "../../Component/Icon"
export default function Playlist () {
    return(
        <div>
            <div className="text-[#ffff]">
                <div className="flex mb-[32px] gap-5">
                    <div className="text-[20px] font-semibold">Danh sách</div>
                    <div className="flex">
                        <div className="rounded-full border-1 flex justify-center py-[5px] px-[12px] text-[12px] gap-2 w-[100%]">
                            <i><Icon name='+'/></i>
                            <span>Thêm mới</span>
                        </div>
                    </div>
                </div>
                <div className="py-[48px] px-[32px] text-center rounded-2xl bg-[#14161D]">
                    Bạn chưa có danh sách nào
                </div>
            </div>
        </div>
    )
}