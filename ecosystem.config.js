module.exports = {
    apps: [{
        name: 'nest-home-backend-server',
        script: 'dist/backend/src/main.js',

        // Options reference: https://pm2.keymetrics.io/docs/usage/application-declaration/
        args: 'one two',
        instances: 1,
        autorestart: true,
        watch: false,
        max_memory_restart: '1G',
        env: {
            NODE_ENV: 'development'
        },
        env_production: {
            NODE_ENV: 'production'
        }
    }],

    deploy: {
        production: {
            user: 'work',
            host: '192.168.0.44',
            ref: 'origin/develop',
            repo: 'git@github.com:tfechtner/ng-home-automation.git',
            path: '/Users/work/Workspace/ng-home-automation',
            'post-deploy': 'cd backend npm install && npm run prestart:prod && pm2 reload ecosystem.config.js --env production'
        }
    }
};
