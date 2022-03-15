export const isEmpty = (obj) => {
    if( obj === undefined) return true ;
    return Object.keys(obj).length === 0;
}