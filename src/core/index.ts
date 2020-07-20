import loaderUtils from "loader-utils";
import generator from "@babel/generator";
import optionValidate from "./validate";
import {transform} from "./transform";
import {prase} from "./parse";

/**
 * use loader Option to remove some module we don`t want to import in final static file
 * @param source webpack chunk content 
 * @author chrislee
 * @since 2020/7/11
 */
function moudleRemover(this: any, source:string):string{
    const opt = loaderUtils.getOptions(this);
    const normalizeOpt = optionValidate(opt as any);
    const ast = prase(source);
    transform(ast,(opt.type as any),normalizeOpt);
    const result = generator(ast);
    return result.code;
}

export default moudleRemover;