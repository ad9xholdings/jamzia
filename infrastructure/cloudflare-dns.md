# ═══════════════════════════════════════════════════════════
# Cloudflare DNS Configuration — JamZia Networks
# Charging Document v2.1 Compliant
# Owner: Ad9x Holdings, LLC
# Generated: 2026-04-24
# ═══════════════════════════════════════════════════════════

# Primary Domain: jamzia.tv
# DNS Provider: Cloudflare (recommended for SSL + Proxy + Analytics)
# SSL Mode: Full (strict) — TLS 1.3 required
# Proxy Status: Orange-clouded (CDN + DDoS + WAF)

# ─── A/AAAA Records ───
# Root domain → points to reverse proxy / origin server
A       jamzia.tv             <ORIGIN_IP>           proxied
AAAA    jamzia.tv             <ORIGIN_IPV6>         proxied

# ─── CNAME Records — Subdomains ───
# All subdomains route through Cloudflare proxy for SSL termination

# Application Portal — Main app experience
CNAME   app.jamzia.tv         jamzia.tv             proxied

# API Gateway — Backend endpoint root
CNAME   api.jamzia.tv         jamzia.tv             proxied

# Developer Documentation
CNAME   docs.jamzia.tv        jamzia.tv             proxied

# System Status / Health Dashboard
CNAME   status.jamzia.tv      jamzia.tv             proxied

# Audit Logs Viewer
CNAME   audit.jamzia.tv       jamzia.tv             proxied

# WWW redirect → canonical root
CNAME   www.jamzia.tv         jamzia.tv             proxied

# ─── TXT Records ───
# SPF / DKIM / Domain Verification placeholders
TXT     jamzia.tv             "v=spf1 include:_spf.google.com ~all"
TXT     _dmarc.jamzia.tv      "v=DMARC1; p=quarantine; rua=mailto:dmarc@jamzia.tv"

# ─── SRV / MX (if mail required) ───
# MX    jamzia.tv    10    mail.jamzia.tv

# ─── Page Rules (Cloudflare) ───
# 1. Force HTTPS on all subdomains
#    URL: *jamzia.tv/*
#    Setting: Always Use HTTPS → ON
#
# 2. Cache static assets aggressively
#    URL: *jamzia.tv/assets/*
#    Setting: Cache Level → Cache Everything
#    TTL: 1 month
#
# 3. API bypass cache
#    URL: api.jamzia.tv/*
#    Setting: Cache Level → Bypass
#
# 4. Security headers on all routes
#    URL: *jamzia.tv/*
#    Setting: Security Level → High
#
# ─── SSL/TLS Settings ───
# Mode:              Full (strict)
# Minimum TLS:       1.3
# HSTS:              ON (max-age=31536000; includeSubDomains; preload)
# Always HTTPS:      ON
# Automatic HTTPS:   ON
# TLS 1.3:           ON
# 0-RTT:             ON (for performance)

# ─── Firewall Rules ───
# Block traffic not from expected geos (optional)
# (expression: ip.geoip.country ne "US" and ip.geoip.country ne "CA")

# Rate limiting on API
# api.jamzia.tv — 100 req/min per IP

# ═══════════════════════════════════════════════════════════
# DEPLOYMENT CHECKLIST
# ═══════════════════════════════════════════════════════════
# [ ] Replace <ORIGIN_IP> with your NGINX reverse proxy IP
# [ ] Replace <ORIGIN_IPV6> if available
# [ ] Enable Cloudflare proxy (orange cloud) on all records
# [ ] Configure SSL/TLS → Full (strict)
# [ ] Enable HSTS with preload
# [ ] Verify with: curl -I https://app.jamzia.tv
# [ ] Verify SSL Labs grade: A+
# [ ] Add to auditEngine endpoint list
# ═══════════════════════════════════════════════════════════
