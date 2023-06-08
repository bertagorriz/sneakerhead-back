# ENDPOINTS

## USER

- **[POST]/user/login**

  :green_circle: `Status 200`

  :red_circle: `Status 401 "Wrong credentials"`

  :red_circle: `Status 400 "Password is not allowed to be empty"`

## SNEAKERS

- **[GET]/sneakers**

  :green_circle: `Status 200`

- **[DELETE]/delete/:id**

  :green_circle: `Status 200 "Sneaker successfully deleted"`

  :red_circle: `Status 404 "Sneaker not found"`

## ERRORS

:red_circle: `Status 404 "Endpoint not found"`

:red_circle: `Status 500 "General error"`
