# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)


Game Data: 
```js
GAME = {
	"id" : 0,
	"champion" : {
					"id" : 0,
					"username" : "jaecheese",
					"created_at" : "2021-10-15",
					"updated_at" : "2021-10-15",
				},
	"turn" : 1
	"tokens" : {
					"ruby" : 0, 
					"emerald" : 0, 
					"sapphire" : 0, 
					"diamond" : 0, 
					"onyx" : 0
				},
    "nobles" : [
                    { 
                    "id" : 0, 
                    "score" : 3, 
                    "cost" : {
                        "ruby" : 0, 
                        "emerald" : 0, 
                        "sapphire" : 0, 
                        "diamond" : 0, 
                        "onyx" : 0
                        }
                    },
                    { 
                    "id" : 0, 
                    "score" : 3, 
                    "cost" : {
                        "ruby" : 0, 
                        "emerald" : 0, 
                        "sapphire" : 0, 
                        "diamond" : 0, 
                        "onyx" : 0
                        }
                    },
                ]
	"players" : [ 
					{
						"id" : 0,
                        "position" : 1, 
						"user" : {
									"id" : 0,
									"username" : "jaecheese",
									"created_at" : "2021-10-15",
									"updated_at" : "2021-10-15",
								},
						"nobles" : 	[
										{ 
										"id" : 0, 
										"score" : 3, 
										"cost" : {
											"ruby" : 0, 
											"emerald" : 0, 
											"sapphire" : 0, 
											"diamond" : 0, 
											"onyx" : 0
											}
										},
									], 
						"tokens" : 	{
										"ruby" : 0, 
										"emerald" : 0, 
										"sapphire" : 0, 
										"diamond" : 0, 
										"onyx" : 0
									},
						"cards" : [
									{ 
										"id" : 0,
										"score" : 0, 
										"deck_id" : 0, 
										"token" : "ruby",
										"cost" : {
													"ruby" : 0, 
													"emerald" : 0, 
													"sapphire" : 0, 
													"diamond" : 0, 
													"onyx" : 0
												}
									}
									],
						},
						{
						"id" : 0,
                        "position" : 1, 
						"user" : {
									"id" : 0,
									"username" : "jaecheese",
									"created_at" : "2021-10-15",
									"updated_at" : "2021-10-15",
								},
						"nobles" : 	[
										{ 
										"id" : 0, 
										"score" : 3, 
										"cost" : {
											"ruby" : 0, 
											"emerald" : 0, 
											"sapphire" : 0, 
											"diamond" : 0, 
											"onyx" : 0
											}
										},
									], 
						"tokens" : 	{
										"ruby" : 0, 
										"emerald" : 0, 
										"sapphire" : 0, 
										"diamond" : 0, 
										"onyx" : 0
									},
						"cards" : [
									{ 
										"id" : 0,
										"score" : 0, 
										"deck_id" : 0, 
										"token" : "ruby",
										"cost" : {
													"ruby" : 0, 
													"emerald" : 0, 
													"sapphire" : 0, 
													"diamond" : 0, 
													"onyx" : 0
												}
									}
									],
						},
					]
	"decks" : [ 
		{
			"id" : 0, 
			"game_id" : 0, 
			"color" : "green", 
			"cards" : [	
							{ 
								"id" : 0,
								"score" : 0, 
								"deck_id" : 0, 
								"token" : "ruby",
								"cost" : {
											"ruby" : 0, 
											"emerald" : 1, 
											"sapphire" : 1, 
											"diamond" : 1, 
											"onyx" : 1
										}
							},
							{ 
								"id" : 0,
								"score" : 0, 
								"deck_id" : 0, 
								"token" : "diamond",
								"cost" : {
											"ruby" : 4, 
											"emerald" : 0, 
											"sapphire" : 0, 
											"diamond" : 0, 
											"onyx" : 0
										}
							},// alot more cards would go here
						]
		},
		{
			"id" : 0, 
			"game_id" : 0, 
			"color" : "yellow", 
			"cards" : [	
							{ 
								"id" : 0,
								"score" : 0, 
								"deck_id" : 0, 
								"token" : "ruby",
								"cost" : {
											"ruby" : 0, 
											"emerald" : 1, 
											"sapphire" : 1, 
											"diamond" : 1, 
											"onyx" : 1
										}
							},
							{ 
								"id" : 0,
								"score" : 0, 
								"deck_id" : 0, 
								"token" : "diamond",
								"cost" : {
											"ruby" : 4, 
											"emerald" : 0, 
											"sapphire" : 0, 
											"diamond" : 0, 
											"onyx" : 0
										}
							},// alot more cards would go here
						]
		},
		{
			"id" : 0, 
			"game_id" : 0, 
			"color" : "blue", 
			"cards" : [	
							{ 
								"id" : 0,
								"score" : 0, 
								"deck_id" : 0, 
								"token" : "ruby",
								"cost" : {
											"ruby" : 0, 
											"emerald" : 1, 
											"sapphire" : 1, 
											"diamond" : 1, 
											"onyx" : 1
										}
							},
							{ 
								"id" : 0,
								"score" : 0, 
								"deck_id" : 0, 
								"token" : "diamond",
								"cost" : {
											"ruby" : 4, 
											"emerald" : 0, 
											"sapphire" : 0, 
											"diamond" : 0, 
											"onyx" : 0
										}
							},// alot more cards would go here
						]
		},
			]
}
```