import axios from 'axios';
import { performance } from 'perf_hooks'

const BASE_URL = 'https://jsonplaceholder.typicode.com';

const getPostWithComments = async (postId: number) => {
    performance.mark('start');
    const { data: post } = await axios.get(`${BASE_URL}/posts/${postId}`);
    const { data: comments } = await axios.get(`${BASE_URL}/posts/${postId}/comments`);
    performance.mark('end');
    const { duration } = performance.measure('Request duration', 'start', 'end');
    setTimeout(() => {
        console.log(`Duration: ${duration}ms`);
    }, 0);
    return { post, comments };
};

const getPostWithCommentsParalel = async (postId: number) => {
    try {
        performance.mark('start');
        const postPromise = axios.get(`${BASE_URL}/posts/${postId}`);
        const commentsPromise = axios.get(`${BASE_URL}/posts/${postId}/comments`);
        const promiseResult = await Promise.allSettled([postPromise, commentsPromise]);

        const [post, commentsRaw] = promiseResult.map((result) => {
            if (result.status === 'fulfilled') {
                return result.value;
            }
            throw result.reason;
        });

        const comments = commentsRaw.data.map((comment: any) => {
            delete comment.postId;
            return comment;
        });

        performance.mark('end');
        const { duration } = performance.measure('Request duration', 'start', 'end');
        setTimeout(() => {
            console.log(`Duration: ${duration}ms`);
        }, 0);
        return { post: post.data, comments };
    } catch (error) {
        console.error('Error:', error);
    }
};

const printResults = async (fn: (postId: number) => Promise<any>) => {
    const result = await fn(1);
    console.log(result);
}

// printResults(getPostWithComments);
printResults(getPostWithCommentsParalel);