npm.cmd install
npm.cmd run prisma:generate
npm.cmd run prisma:migrate
npm.cmd run prisma:seed

curl.exe -i -X POST "http://localhost:3000/orders" -H "Content-Type: application/json" -d "{\"customer\":\"teste@example.com\",\"items\":[]}"

compra de livro fisico
testando se da um error de carrinho
curl.exe -i -X POST "http://localhost:3000/orders" -H "Content-Type: application/json" -d "{\"customer\":\"teste@example.com\",\"items\":[{\"productId\":1,\"quantity\":1}],\"paymentMethod\":\"credit_card\",\"paymentDetails\":{\"cardNumber\":\"1234567812345678\",\"cvv\":\"123\"}}"
cartão recusado
curl.exe -i -X POST "http://localhost:3000/orders" -H "Content-Type: application/json" -d "{\"customer\":\"teste@example.com\",\"items\":[{\"productId\":1,\"quantity\":1}],\"paymentMethod\":\"credit_card\",\"paymentDetails\":{\"cardNumber\":\"1234567812345678\",\"cvv\":\"000\"}}"
Produto inexistente
curl.exe -i -X POST "http://localhost:3000/orders" -H "Content-Type: application/json" -d "{\"customer\":\"teste@example.com\",\"items\":[{\"productId\":9999,\"quantity\":1}],\"paymentMethod\":\"credit_card\",\"paymentDetails\":{\"cardNumber\":\"1234567812345678\",\"cvv\":\"123\"}}"


validado