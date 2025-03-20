import {TableInfoDto} from "@/interface/dto/codeGenerator/TableInfoDto.ts";
import {TableAndFieldDto} from "@/interface/dto/codeGenerator/TableAndFieldDto.ts";

export interface GenerateCodeDto extends TableInfoDto{
    isCover: boolean
    isGenerateJava: boolean
    isGenerateVue: boolean
    isGenerateTreeSelect: boolean
    tableAndFieldDtoList: TableAndFieldDto[]
}