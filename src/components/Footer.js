import { Box, Container, Typography } from "@material-ui/core";


const Footer = () => (

<Box textAlign="center" paddingTop="10px" paddingBottom="20px" color="gray" borderTop="1px" borderBottom="10px" style={{
    backgroundColor: "#EEEEEE"
}}>
{`${new Date().getFullYear()} CryptoHub, Inc`}
</Box>

)

export default Footer