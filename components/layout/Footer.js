import React from 'react';
import Grid from '@mui/system/Unstable_Grid/Grid';
import Link from 'next/link';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';

const Footer = () => {
  return (
    <footer>
      <Grid container>
        <Grid container md={8} mdOffset={2} spacing={3}>
          <Grid md={4}>
            <div className="footer-brand">
              <h3>Chimoney</h3>
              <p>
                Components may have multiple widths defined, causing the layout
                to change at the defined breakpoint. Width values given to
                larger breakpoints override those given to smaller breakpoints.
              </p>
            </div>
          </Grid>
          <Grid xs={6} md={2}>
            <h5>My Account</h5>
            <Link href="/">My Account</Link>
            <Link href="/">My Orders</Link>
            <Link href="/">Watchlist</Link>
            <Link href="/">Help</Link>
          </Grid>
          <Grid xs={6} md={2}>
            <h5>Information</h5>
            <Link href="/">Return Policy</Link>
            <Link href="/">FAQs</Link>
            <Link href="/">Terms and conditions</Link>
            <Link href="/">Privacy Policy</Link>
            <Link href="/">Contact</Link>
          </Grid>
          <Grid md={4} className="footer-social-links">
            <h5>Connect With Us</h5>
            <Link
              href="https://www.linkedin.com/in/yomioakande/"
              rel="noopener noreferrer"
              target="_blank"
            >
              <LinkedInIcon />
            </Link>
            <Link
              href="https://www.twitter.com/yomioakande/"
              rel="noopener noreferrer"
              target="_blank"
            >
              <TwitterIcon />
            </Link>
            <Link
              href="https://www.instagram.com/yomioakande/"
              rel="noopener noreferrer"
              target="_blank"
            >
              <InstagramIcon />
            </Link>
            <Link href="/" rel="noopener noreferrer" target="_blank">
              <YouTubeIcon />
            </Link>
          </Grid>
          <Grid md={12}>
            <div className="copyright">
              All rights reserved. Copyright &copy;2023 Chimoney. Developed by
              Yomi O. Akande
            </div>
          </Grid>
        </Grid>
      </Grid>
    </footer>
  );
};

export default Footer;
