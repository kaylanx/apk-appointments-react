mkdir -p build/apk-appointments
cp -r wordpress-plugin/includes build/apk-appointments
cp wordpress-plugin/*.php build/apk-appointments
cp wordpress-plugin/readme.txt build/apk-appointments

cd react-app
npm run build
cd ..
cp -r react-app/build/static/ build/apk-appointments/includes/
 