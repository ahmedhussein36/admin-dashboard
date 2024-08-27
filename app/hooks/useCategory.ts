import getcategories,{IParams} from "../actions/getcategories";

interface IParam{
    searchParams : IParams
} 

export const useCategory = async({searchParams} : IParam) => {
    const getAll = await getcategories(searchParams)

    return {
        getAll,
    };
};
