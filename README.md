# An exmple squid that grabs every Transfer(address,address,uint256) event on Ethereum

Well, not exactly. It grabs every such event starting from block `16400000`, attempts to parse the event data and only stores the events that were parsed successfully in the database. These events can then be browsed using a GraphQL API/GraphiQL playground.

Dependencies: NodeJS, Docker.

To see it in action, begin by spinning up a *processor*, a process that ingests the data from the Ethereum Archive:

```bash
$ git clone https://github.com/abernatskiy/subsquid-events-by-topic-example
$ cd subsquid-events-by-topic-example/
$ npm i
$ sqd build
$ sqd up # starts a Postgres database in a Docker container
$ sqd process # begins data ingestion
```

Then start the GraphQL server:

```bash
$ sqd serve
```

GraphQL playground should be available at [localhost:4350/graphql](http://localhost:4350/graphql).
