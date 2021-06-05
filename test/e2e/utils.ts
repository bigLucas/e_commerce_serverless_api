import * as request from 'supertest';

export const checkServer = async (maxNumOfAttempts: number = 0) => {
    maxNumOfAttempts++;
    if (maxNumOfAttempts === 6) {
        throw new Error('Maximum number of attempts reached');
    }
    await sleep(2000);
    try {
        // if the request does not throw an error we can return
        await request('http://localhost:3000').get('/dev');
        return;
    } catch (error) {
        // try connect to the server again
        await checkServer(maxNumOfAttempts);
    }    
}

const sleep = async (timeoutInMs: number): Promise<void> => {
    return new Promise(resolve => {
        setTimeout(resolve, timeoutInMs);
    });
};
