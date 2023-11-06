import { where } from "../models/query.type";

export function simpleSQLBuilder(
    type: string, 
    table: string, 
    tableAlias: string, 
    fields?: string[], 
    wheres?: where[]
    ): string {
    let query: string = "";

    switch (type.toLowerCase()) {
        case 'select': {
            let selectFields: string[] = [];
            // must select at leats 1 field
            if (!fields || fields.length < 1) {
                break;
            }
            query += 'select ';
            fields.forEach( (field) => {
                selectFields.push(field);
            });
            query += selectFields.join(', ') + ' from ' + table + ' ' + tableAlias;
            break;
        }
        default: {
            // intentionally left blank
        }
    }

    let whereFields: string[] = [];
    if (wheres && Object.keys(wheres).length > 0) {
        wheres.forEach( (where) => {
            if (where.condition) {
                let type: string = (whereFields.length > 0 ? where.type : '');
                whereFields.push(type + ' ' + where.key + ' ' + where.operator + ' :' + where.paramName);
            }
        });

        if (whereFields.length > 0) {
            query += ' where' + whereFields.join(' ');
        }
    } 

    return query
}