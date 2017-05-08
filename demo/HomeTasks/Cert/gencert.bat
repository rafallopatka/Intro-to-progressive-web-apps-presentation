makecert.exe ^
-n "CN=CARootLocal" ^
-r ^
-pe ^
-a sha512 ^
-len 4096 ^
-cy authority ^
-sv CARootLocal.pvk ^
CARootLocal.cer

pvk2pfx.exe ^
-pvk CARootLocal.pvk ^
-spc CARootLocal.cer ^
-pfx CARootLocal.pfx ^
-po qwerty