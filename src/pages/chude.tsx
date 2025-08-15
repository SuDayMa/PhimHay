import { Link } from "react-router-dom";
import Icon from "../Component/Icon";
import { DataChudes } from "../Data/datachude";

export default function Chude() {
  return (
    <div className="text-[#ffff] bg-[#191B24] py-[150px]">
      <div className="mx-[330px] max-[2000px]:mx-[0px] px-[50px] max-[2000px]:px-[20px]">
        <div className="flex text-[28px] font-medium mb-[19px]">
          <h1>Các chủ đề</h1>
        </div>
        <div className="mt-[32px] grid grid-cols-7 max-[1616px]:grid-cols-6 max-[1390px]:grid-cols-5 max-[1162px]:grid-cols-4 max-[800px]:grid-cols-3 max-[574px]:grid-cols-2 gap-4">
          {DataChudes.map((chude) => (
            <a
              key={chude.id}
              className="py-[20px] pl-[25px] pr-[30px] max-[390px]:py-[10px] max-[390px]:pl-[10px] max-[390px]:pr-[0px] rounded-xl hover:-translate-y-[10px] transition-all duration-300"
              style={{ backgroundColor: chude.color }}
              >
                <Link to={chude.link}>
              <div className="">
                <div className="flex flex-col justify-end h-[110px] gap-2">
                  <div className="text-[28px] max-[1100px]:text-[20px] font-bold">{chude.title}</div>
                  <div className="flex items-center gap-1">
                    <span className="text-[14px] max-[1100px]:text-[10px]">{chude.subtitle}</span>
                    <p className="text-2xl"><Icon name="small right" /></p>
                  </div>
                </div>
              </div>
              </Link>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
