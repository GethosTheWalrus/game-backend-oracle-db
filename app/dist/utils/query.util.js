"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.simpleSQLBuilder = void 0;
function simpleSQLBuilder(type, table, tableAlias, fields, sets, inserts, wheres) {
    let query = '';
    switch (type.toLowerCase()) {
        case 'select': {
            let selectFields = [];
            // must select at least 1 field
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
        case 'update': {
            let settableFields = [];
            // must update at least 1 field
            if (!sets || sets.length < 1) {
                break;
            }
            query += 'update ' + table + ' ' + tableAlias + ' set ';
            sets.forEach((set) => {
                settableFields.push(set.key + ' = :' + set.paramName);
            });
            query += settableFields.join(', ');
            break;
        }
        case 'insert': {
            let insertableFields = [];
            // must insert into at least 1 field
            if (!fields || !inserts || fields.length < 1 || inserts.length < 1) {
                break;
            }
            query += 'insert into ' + table + ' ' + tableAlias + ' (' + fields.join(', ') + ') values ';
            inserts === null || inserts === void 0 ? void 0 : inserts.forEach((insert) => {
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
