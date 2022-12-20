export default replace;
declare function replace(options: any): {
    name: string;
    transform: (code: any, id: any) => {
        code: any;
        map: any;
    };
};
