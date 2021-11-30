## current documention for project usage

1- download all node_modules listed in: package.json > dependencies by using this command in terminal: npm install

2- create file name it exactly as this ".env" and set the next lines on it:

DATABASE_URL = mongodb://localhost/test0001
ACCESS_TOKEN_SECRET = 8bddad30af9a0f0acb555a42df8adf795a67e1c693c78f14f96794469c68042b56f266df587cfe024c35350e309b833e8ba7f6196588173ccf590d02fb9c05cd
REFRESH_TOKEN_SECRET = 9ea687a5836fd67c01fa30343176c50f9b90aabf5a2652d7ed922dac0222de1b348273abf4f3b59b40d390ee97aad90f4352fa4e31b84109a98cca72adcfc3e7

(make sure this variables is local and not sent to the repository)

3- incase the file .env color wasnt dark grey (ignored) go to .gitignore and in new line write .env make sure the file is ignored before pushing new update

4- pulling instructions: in terminal write the following commands (every line is a single command dont copy multilines):

git pull origin

your passSphere password

5- pushing instructions: in terminal write the following commands (every line is a single command dont copy multilines):

git add .

git commit -m "update x.x.x"

git push -u origin main

your passSphere password

(x.x.x is the update version for example 1.1.0 every update got a minor version or major version depends on the update make sure to report the changes in the update on deveolpersLog with notes saying what left to do)