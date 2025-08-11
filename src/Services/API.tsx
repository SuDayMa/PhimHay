
import { baseURL } from "./BaseURL";

export const QuocgiaAPI = async () => {
    try{
        const response = await fetch('https://phimapi.com/quoc-gia/');
        return await response.json() 
    }
    catch (error) {
        console.error("Error fetching Quocgia data:", error);
        return 
    }
}

export const TheloaiAPI = async () => {
    try {
        const response = await fetch('https://phimapi.com/the-loai');
        return await response.json()
    }
    catch (error) {
        console.error("Error fetching Theloai data:", error);
        return 
    }
}

export const MovieAPI = async (type_list: string, page: number ,sort_field: string , sort_type: string, sort_lang: string , category: string, year: string, limit: number ) => {
    try {
        const response = await baseURL.get(`quoc-gia/${type_list}?page=${page}&sort_field=${sort_field}&sort_type=${sort_type}&sort_lang=${sort_lang}&category=${category}&year=${year}&limit=${limit}`);
        return response.data
    } catch (error) {
        console.error("Error fetching Movie data:", error);
        return 
    }
}

export const slidePhimQuocGia = async (type_list: string) => {
    try{
        const reponse = await baseURL.get(`quoc-gia/${type_list}`);
        return reponse.data
    }catch (error) {
        console.error("Error fetching TheloaiMovie data:", error);
        return
    }
}

export const slidePhimTheLoai = async (type_list: string) => {
    try{
        const reponse = await baseURL.get(`the-loai/${type_list}`);
        return reponse.data
    }catch (error) {
        console.error("Error fetching TheloaiMovie data:", error);
        return
    }
}

export const TheloaiMovieAPI = async (type_list: string, page: number ,sort_field: string , sort_type: string, sort_lang: string , category: string, country: string, year: string, limit: number ) => {
    try {
        const response = await baseURL.get(`the-loai/${type_list}?page=${page}&sort_field=${sort_field}&sort_type=${sort_type}&sort_lang=${sort_lang}&category=${category}&country=${country}&year=${year}&limit=${limit}`);
        return response.data
    } catch (error) {
        console.error("Error fetching TheloaiMovie data:", error);
        return
    }
}

export const PhimAPI = async (slug: string) => {
    try{
        const reponse = await fetch(` https://phimapi.com/phim/${slug}`)
        return await reponse.json()
    }catch (error) {
        console.error("Error fetching Phim data:", error);
        return 
    }
}

export const SlidePhimboAPI = async (type_list: string) => {
    try{
        const reponse = await baseURL.get(`danh-sach/${type_list}`);
        return reponse.data
    }catch (error) {
        console.error("Error fetching Phimbo data:", error);
        return 
    }
}

export const DanhSachAPI = async (type_list: string, page: number, sort_field: string, sort_type: string, sort_lang: string, category: string, country: string, year: string, limit: number) => {
    try{
        const reponse = await baseURL.get(`danh-sach/${type_list}?page=${page}&sort_field=${sort_field}&sort_type=${sort_type}&sort_lang=${sort_lang}&category=${category}&country=${country}&year=${year}&limit=${limit}`);
        console.log('Danh sach phim',reponse)
        return reponse.data
    }catch (error) {
        console.error("Error fetching Phimbo data:", error);
        return 
    }
}
export const SearchAPI = async (keyword: string, page: number, sort_field: string, sort_type: string, sort_lang: string, category: string, country: string, year: string, limit: number) => {
    try{
        const reponse = await baseURL.get(`tim-kiem?keyword=${keyword}&page=${page}&sort_field=${sort_field}&sort_type=${sort_type}&sort_lang=${sort_lang}&category=${category}&country=${country}&year=${year}&limit=${limit}`)
        return reponse.data
    }catch (error) {
        console.error("Error fetching Phimbo data:", error)
        return
    }
}

export const PhimNewUpdateAPI = async () => {
    try{
        const response = await fetch('https://phimapi.com/danh-sach/phim-moi-cap-nhat-v3?');
        return await response.json();
    }catch (error) {
        console.error("Error fetching PhimNewUpdate data:", error);
        return
    }
}

export const YearAPI = async (type_list: number,page: number , sort_field:string, sort_type: string, sort_lang: string, category: string, country: string, year: string, limit: number ) => {
    try{
        const reponse = await baseURL.get(`nam/${type_list}?page=${page}&${sort_field}&sort_type=${sort_type}&sort_lang=${sort_lang}&category=${category}&country=${country}&year=${year}&limit=${limit}`)
        return reponse.data
    }catch (error){
        console.error("Error fetching Phimbo data:", error)
        return
    }
}

export const ListSearchAPI = async (keyword: string) => {
    try{
        const reponse = await baseURL.get(`tim-kiem?keyword=${keyword}`)
        return reponse.data
    }catch (error) {
        console.error("Error fetching Phimbo data:", error)
        return
    }

}
