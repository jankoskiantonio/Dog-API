if [ ! -f /app/.seeded ]; then
    node seed
    touch /app/.seeded
fi

node server.js