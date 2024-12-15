NR < 16 {
    headers = (headers == "" ? $0 : headers ", " $0)
    next
}
NR == 16 {
    sub(",", "", headers) # commas are removed from locations
    print headers
}
/[a-zA-Z]/ {
    if (numbers != "") {
        print names ", " numbers
        names = ""
        numbers = ""
    }
    gsub(",", "", $0)
    names = (names == "" ? $0 : names " " $0)
    next
}
/[0-9]/ {
    gsub(",", "", $0)
    numbers = (numbers == "" ? $0 : numbers ", " $0)
}
END {
    if (names != "" || numbers != "") {
        print names ", " numbers
    }
}