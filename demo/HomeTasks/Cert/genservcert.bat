makecert.exe ^
-n "CN=localhost.com" ^
-iv CARootLocal.pvk ^
-ic CARootLocal.cer ^
-pe ^
-a sha512 ^
-len 4096 ^
-b 01/01/2017 ^
-e 01/01/2018 ^
-sky exchange ^
-eku 1.3.6.1.5.5.7.3.1 ^
-sv %1.pvk ^
%1.cer
 
 
pvk2pfx.exe ^
-pvk %1.pvk ^
-spc %1.cer ^
-pfx %1.pfx ^
-po qwerty