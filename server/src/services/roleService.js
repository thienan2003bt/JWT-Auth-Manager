import db from '../models/index';
import _ from 'lodash';

const createNewRole = async (newRoleData) => {
    try {
        let currentRoles = await db.Role.findAll({
            attributes: ['url', 'description'],
            raw: true,
        })

        let newRoleDataLength = Object.entries(newRoleData).length;

        let persistData = [];
        for (let i = 0; i < newRoleDataLength; i++) {
            let url1 = newRoleData[i].url;
            for (let j = 0; j < currentRoles.length; j++) {
                let url2 = currentRoles[j].url;
                if (url1 === url2) {
                    continue;
                } else if (j === currentRoles.length - 1) {
                    persistData.push(newRoleData[i]);
                }

            }
        }

        if (persistData?.length === 0) {
            return {
                errCode: '1',
                errMsg: 'Nothing to create due to duplicate role',
                data: null,
            }
        }

        await db.Role.bulkCreate(persistData);

        return {
            errCode: '0',
            errMsg: `Create ${persistData.length} new roles successfully`,
            data: persistData,
        }
    } catch (error) {
        return {
            errCode: '-2',
            errMsg: 'Something went wrong when creating new role',
            data: null,
        }
    }
}


module.exports = {
    createNewRole,
}