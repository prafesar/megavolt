`firebase deploy --only functions`
`firebase deploy --only functions --debug`

[Hello World](https://us-central1-prafesar-labs.cloudfunctions.net/setCableList)

`firebase deploy --only functions:setCableList`

To continue deploying other features (such as database), run:
`firebase deploy --except functions`

With Express app routing, the function name is added as a prefix to the URL paths in the app you define. For example, the URL to invoke the getter in the Express app example above looks like this:

`https://us-central1-<project-id>.cloudfunctions.net/widgets/<id>`
