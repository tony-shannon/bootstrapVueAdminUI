const {GraphQLJSONObject} = require('graphql-type-json');

const universalResolver = {

    index: async (_, {tableName}, {dataSources}) => {

        let client = dataSources.db.client;
        const result = await client.manyOrNone('SELECT * FROM "' + tableName + '"');
        return result.length ? result : [];
    },
    update: async (_, {where, data, tableName}, {dataSources}) => {

        let lib = dataSources.db.lib;
        let helpers = dataSources.db.helpers;
        let client = dataSources.db.client;

        const condition = lib.as.format(' WHERE id = ${id}', where);
        var prepareStatement = helpers.update(data, null, tableName) + condition + " RETURNING *";
        const result =  client.one(prepareStatement).then((res)=>res);
        return result;
    },
    create: async (_, {data, tableName}, {dataSources}) => {

        let helpers = dataSources.db.helpers;
        let client = dataSources.db.client;

        var prepareStatement = helpers.insert(data,null,tableName) + " RETURNING *";
        const result = client.one(prepareStatement).then((res) => res);
        return result;
    },
    delete: async (_, {where, tableName},{dataSources}) => {

        let lib = dataSources.db.lib;

        var prepareStatement = lib.as.format('DELETE FROM "'+tableName+'" WHERE id=${id} RETURNING *',where);
        const result =  dataSources.db.client.oneOrNone(prepareStatement).then((res)=>res);
        return result;
    },
};

const resolvers = {
    Query: {
        medications: async (_, params, {dataSources}) =>
            await universalResolver.index(_,
                {
                    tableName: 'Medication'
                }, {
                    dataSources: dataSources
                }
            ),
        adverse_Events: async (_, params, {dataSources}) =>
            await universalResolver.index(_,
                {
                    tableName: 'Adverse_Event'
                }, {
                    dataSources: dataSources
                }
            ),

        problems: async (_, params, {dataSources}) =>
            await universalResolver.index(_,
                {
                    tableName: 'Problem'
                }, {
                    dataSources: dataSources
                }
            ),
        patients: async (_, params, {dataSources}) =>
            await universalResolver.index(_,
                {
                    tableName: 'Patient'
                }, {
                    dataSources: dataSources
                }
            ),

    },
    Mutation: {

        createMedication: async (_, {data}, {dataSources}) =>
            await universalResolver.create(_,
            {
                data: data,
                tableName: 'Medication'
            },
            {
                dataSources: dataSources
            }
        ),

        deleteMedication: async (_, {where},{dataSources}) =>
            universalResolver.delete(_,
                {
                    where: where,
                    tableName: 'Medication'
                },
                {
                    dataSources: dataSources
                }
            ),
        updateMedication:  async (_, {where,data},{dataSources}) =>
            await universalResolver.update(_,
                {
                    where: where,
                    data: data,
                    tableName: 'Medication'
                },
                {
                    dataSources: dataSources
                }),

        createAdverse_Event: async (_, {data}, {dataSources}) =>
            await universalResolver.create(_,
                {
                    data: data,
                    tableName: 'Adverse_Event'
                },
                {
                    dataSources: dataSources
                }
            ),

        deleteAdverse_Event: async (_, {where},{dataSources}) =>
            await universalResolver.delete(_,
                {
                    where: where,
                    tableName: 'Adverse_Event'
                },
                {
                    dataSources: dataSources
                }
            ),

        updateAdverse_Event: async (_, {where, data}, {dataSources}) =>
            await universalResolver.update(_,
                {
                    where: where,
                    data: data,
                    tableName: 'Adverse_Event'
                },
                {
                    dataSources: dataSources
                }),


        createProblem: async (_, {data}, {dataSources}) =>
            await universalResolver.create(_,
                {
                    data: data,
                    tableName: 'Problem'
                },
                {
                    dataSources: dataSources
                }
            ),

        deleteProblem: async (_, {where}, {dataSources}) =>
            await universalResolver.delete(_,
                {
                    where: where,
                    tableName: 'Problem'
                },
                {
                    dataSources: dataSources
                }
            ),

        updateProblem: async (_, {where, data}, {dataSources}) =>
            await universalResolver.update(_,
                {
                    where: where,
                    data: data,
                    tableName: 'Problem'
                },
                {
                    dataSources: dataSources
                }),


        createPatient: async (_, {data}, {dataSources}) =>
            await universalResolver.create(_,
                {
                    data: data,
                    tableName: 'Patient'
                },
                {
                    dataSources: dataSources
                }
            ),

        deletePatient: async (_, {where}, {dataSources}) =>
            await universalResolver.delete(_,
                {
                    where: where,
                    tableName: 'Patient'
                },
                {
                    dataSources: dataSources
                }
            ),

        updatePatient: async (_, {where, data}, {dataSources}) =>
            await universalResolver.update(_,
                {
                    where: where,
                    data: data,
                    tableName: 'Patient'
                },
                {
                    dataSources: dataSources
                }),

    },
    Data: GraphQLJSONObject,
};

module.exports = {
    resolvers: resolvers,
};
