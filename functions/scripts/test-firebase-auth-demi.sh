 #!/bin/bash                                   

API_KEY="AIzaSyBOtM0OkuE-PPueNeidkfBHh0a-pYR255k"
               
EMAILS=(
	testing15689875@gmail.com
)                                   

PASSWORD="TESTING"            
    
for EMAIL in "${EMAILS[@]}"; do       
  echo "Creating user: $EMAIL"        
   
  RESPONSE=$(curl -s -X POST "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=$API_KEY" \
    -H "Content-Type: application/json" \
    -d "{                                   
          \"email\": \"$EMAIL\",
          \"password\": \"$PASSWORD\",
          \"returnSecureToken\": true
        }")
   
  echo "Response: $RESPONSE"
  echo "-----------------------------------"
done
