"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.simpleSQLBuilder = void 0;
function simpleSQLBuilder(type, table, tableAlias, fields, wheres) {
    let query = "";
    switch (type.toLowerCase()) {
        case 'select': {
            let selectFields = [];
            // must select at leats 1 field
            if (!fields || fields.length < 1) {
                break;
            }
            query += 'select ';
            fields.forEach((field) => {
                selectFields.push(field);
            });
            query += selectFields.join(', ') + ' from ' + table + ' ' + tableAlias;
            break;
        }
        default: {
            // intentionally left blank
        }
    }
    let whereFields = [];
    if (wheres && Object.keys(wheres).length > 0) {
        wheres.forEach((where) => {
            if (where.condition) {
                let type = (whereFields.length > 0 ? where.type : '');
                whereFields.push(type + ' ' + where.key + ' ' + where.operator + ' :' + where.paramName);
            }
        });
        if (whereFields.length > 0) {
            query += ' where' + whereFields.join(' ');
        }
    }
    return query;
}
exports.simpleSQLBuilder = simpleSQLBuilder;
