// import adapter from '@sveltejs/adapter-auto';

// /** @type {import('@sveltejs/kit').Config} */
// const config = {
// 	kit: {
// 		// adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
// 		// If your environment is not supported or you settled on a specific environment, switch out the adapter.
// 		// See https://kit.svelte.dev/docs/adapters for more information about adapters.
// 		adapter: adapter()
// 	}
// };

// export default config;
// import node from '@sveltejs/adapter-node';

// /** @type {import('@sveltejs/kit').Config} */
// const config = {
// 	kit: {
// 		adapter: node(),
// 	}
// };

// export default config;

// import adapter from '@sveltejs/adapter-node';

// export default {
//     kit: {
//         adapter: adapter()
//     }
// };


import adapter from '@sveltejs/adapter-vercel';

export default {
    kit: {
        adapter: adapter({
        })
    }
};