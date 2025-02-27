import {T_Document} from "src/modules/types.ts";

export const DocumentMocks:T_Document[] = [
    {
        id: 1,
        name: "Паспорт РФ",
        status: 1,
        image: "",
        description: "Старый паспорт, свидетельство о браке или разводе, смене ФИО или даты рождения, фото 35 × 45 мм, чек об оплате госпошлины.",
        prod_period: 10,
        replace_period: 90,
        number_length: 7
    },
    {
        id: 2,
        name: "Загранпаспорт",
        status: 1,
        image: "",
        description: "Ранее выданные загранпаспорта — при наличии, паспорт РФ",
        prod_period: 30,
        number_length: 8
    },
    {
        id: 3,
        name: "Водительское удостоверение",
        status: 1,
        image: "",
        description: "Водительское удостоверение, паспорт РФ",
        prod_period: 1,
        number_length: 6
    },
    {
        id: 4,
        name: "Полис ОМС",
        status: 1,
        image: "",
        description: "Паспорт РФ, старый полис ОМС",
        prod_period: 45,
        replace_period: 30,
        number_length: 5
    }
]