import 'dotenv/config';
import { simpleSQLBuilder } from '../../utils/query.util';

describe('Simple SQL Builder', () => {
    test('that the given input to simpleSQLBuilder results in an expected select query', () => {
        let query: string  = simpleSQLBuilder(
            'select', 
            'C##GAMEDB.PLAYER_SCORES', 
            't',
            [
                'json_serialize(t.data) as DATA' 
            ], 
            [],
            [],
            [
                {
                    key: 't.data.username', 
                    paramName: 'username', 
                    type: '', 
                    operator: '=', 
                    condition: true
                }
            ]
        );
        expect(query).toBe('select json_serialize(t.data) as DATA from C##GAMEDB.PLAYER_SCORES t where t.data.username = :username');
    });
    test('that the given input to simpleSQLBuilder results in an expected update query', () => {
        let query: string  = simpleSQLBuilder(
            'update', 
            'C##GAMEDB.SCORES', 
            't',
            [], 
            [
                {
                    key: 'value',
                    paramName: 'score'
                }
            ],
            [],
            [
                {
                    key: 'id', 
                    paramName: 'id', 
                    type: '', 
                    operator: '=', 
                    condition: true
                }
            ]
        );
        expect(query).toBe('update C##GAMEDB.SCORES t set value = :score where id = :id');
    });
    test('that the given input to simpleSQLBuilder results in an expected insert query', () => {
        let query: string  = simpleSQLBuilder(
            'insert', 
            'C##GAMEDB.SCORES', 
            't',
            [
                'value',
                'user_id'
            ], 
            [],
            [
                ['score', 'userid']
            ],
            []
        );
        expect(query).toBe('insert into C##GAMEDB.SCORES t (value, user_id) values (:score, :userid)');
    });
});