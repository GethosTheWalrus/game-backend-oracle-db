import { where, set } from "../models/query.type";

export function simpleSQLBuilder(
    type: string, 
    table: string, 
    tableAlias: string, 
    fields?: string[], 
    sets?: set[],
    inserts?: string[][],
    wheres?: where[],
    ): string {
    let query: string = '';

    switch (type.toLowerCase()) {
        case 'select': {
            let selectFields: string[] = [];
            // must select at least 1 field
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
        case 'update': {
            let settableFields: string[] = [];
            // must update at least 1 field
            if (!sets || sets.length < 1) {
                break;
            }
            query += 'update ' + table + ' ' + tableAlias + ' set ';
            sets.forEach( (set) => {
                settableFields.push( set.key + ' = :' + set.paramName );
            });
            query += settableFields.join(', ');
            break;
        }
        case 'insert': {
            let insertableFields: string[] = [];
            // must insert into at least 1 field
            if (!fields || !inserts || fields.length < 1 || inserts.length < 1) {
                break;
            }
            query += 'insert into ' + table + ' ' + tableAlias + ' (' + fields.join(', ') + ') values ';
            inserts?.forEach( (insert) => {
                insertableFields.push('(' + insert.map(e => `:${e}`).join(', ') + ')');
            });
            query += insertableFields.join(', ');
            break;
        }
        default: {
            // only build queries of a supported type
            return '';
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