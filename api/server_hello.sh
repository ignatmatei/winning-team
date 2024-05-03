#/bin/bash
cd ../
conda run -n base python test.py "$1"
