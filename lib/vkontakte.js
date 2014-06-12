// Load modules


// Declare internals

var internals = {};


exports = module.exports = function (options) {

    return {
        protocol: 'oauth2',
        auth: 'https://oauth.vk.com/authorize',
        token: 'https://oauth.vk.com/access_token',
        scope: ['email'],
        scopeSeparator: ',',
        headers: { 'User-Agent': 'hapi-bell-vk' },
        profile: function (credentials, params, get, callback) {

            var query = {
                user_ids: params.user_id
            };

            get('https://api.vk.com/method/users.get', query, function (reply) {
                var profile = reply.response[0];

                credentials.profile = {
                    id: profile.uid,
                    displayName: profile.first_name,
                    name: {
                        first: profile.first_name,
                        last: profile.last_name
                    },
                    email: params.email,
                    raw: profile
                };

                return callback();
            });
        }
    };
};
