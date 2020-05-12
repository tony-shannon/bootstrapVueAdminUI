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
        const result = await  client.one(prepareStatement).then((res)=>res);
        return result;
    },
    create: async (_, {data, tableName}, {dataSources}) => {

        let helpers = dataSources.db.helpers;
        let client = dataSources.db.client;

        var prepareStatement = helpers.insert(data,null,tableName) + " RETURNING *";
        const result = await client.one(prepareStatement).then((res) => res);
        return result;
    },
    delete: async (_, {where, tableName},{dataSources}) => {

        let lib = dataSources.db.lib;

        var prepareStatement = lib.as.format('DELETE FROM "'+tableName+'" WHERE id=${id} RETURNING *',where);
        const result = await dataSources.db.client.oneOrNone(prepareStatement).then((res)=>res);
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
        terms: async (_, params, {dataSources}) =>
            await universalResolver.index(_,
                {
                    tableName: 'Term'
                }, {
                    dataSources: dataSources
                }
            ),

        all_enrolments: async (_, params, {dataSources})=>{
            const res = await universalResolver.index(_,
                {
                    tableName: 'Patient'
                }, {
                    dataSources: dataSources
                }
            );
            let response = res.map((el)=>{
                return {
                    created_date: '10-10-1970',
                    patient_id: el.id,
                }
            });
            return response;
        }

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

        obtainToken: (_, {data},{dataSources})=> {
            return {
                token: dataSources.jwt.sign({
                    exp: Math.floor(Date.now() / 1000) + (60 * 60),
                    data: data,
                },'secret'),
            }
        },

        sign_in: async (_, {username, password, csfrtoken}, {dataSources})=>{

            let lib = dataSources.db.lib;
            let client = dataSources.db.client;
            const condition = lib.as.format(' WHERE username = ${username} AND password = ${password}',
                {
                    username: username,
                    password: password
                });

            const result = await client.oneOrNone('SELECT * FROM "User" '+condition);
            if(result !== null){
                return result;
            }else{
                return {
                    ok: false,
                    auth_ok: false,
                    message: 'Not Authorized',
                    require_password_change: false,
                    require_otp: false,
                    require_bat: false,
                }
            }
        },
    },
    Enrolment: {
      record:  async (parent, args, context) =>{
          let lib = context.db.lib;
          console.log(parent);
          let client = context.db.client;
          const condition = lib.as.format(' WHERE id = ${id}',{id: parseInt(parent.patient_id)});

          const result = await client.one('SELECT * FROM "Patient" '+condition);
          if(result){
              return {
                  first_name: result.FirstName,
                  family_name: result.LastName,
                  date_of_birth: '1960-01-01',
                  gender: result.Sex,
                  id: '23-123-4-3-2-3-4-3',
              }
          }
      },
    },
    Data: GraphQLJSONObject,
};

module.exports = {
    resolvers: resolvers,
};
