
def validate(file):
    number = validate_number(file)
    if not number:
        return False
    year = validate_year(file)
    if not year:
        return False
    return True


def validate_number(file):
    number = file['number']
    if 6 > len(number) or len(number) > 8:
        return False
    else:
        return True


def validate_year(file):
    year = int(file['year'])
    if 1990 > year or year > 2023:
        return False
    else:
        return True
