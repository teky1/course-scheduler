#!/bin/sh

crond -f &
CRON_PID=$!

stop_processes() {

    echo "Stopping crond..."
    kill $CRON_PID
    wait $CRON_PID

}

trap stop_processes SIGTERM SIGINT

wait $CRON_PID