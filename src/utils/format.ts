import { format as formatfns } from "date-fns";
import { ptBR } from "date-fns/locale";
import _ from "lodash";

export function format(date: Date, formatString: string) {
    return _.capitalize(formatfns(date, formatString, { locale: ptBR }));
}